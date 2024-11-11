import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let userService: jest.Mocked<UserService>;
  let jwtService: jest.Mocked<JwtService>;

  const mockObjectId = new Types.ObjectId();
  
  const mockUser = {
    _id: mockObjectId,
    email: 'test@example.com',
    password: 'hashedPassword',
    role: 'user',
    __v: 0,
    toObject: () => ({
      _id: mockObjectId,
      email: 'test@example.com',
      password: 'hashedPassword',
      role: 'user',
    }),
    $assertPopulated: jest.fn(),
    $clearModifiedPaths: jest.fn(),
    $clone: jest.fn(),
    $createModifiedPathsSnapshot: jest.fn(),
  };

  beforeEach(async () => {
    const userServiceMock = {
      findByUsername: jest.fn(),
    };

    const jwtServiceMock = {
      sign: jest.fn(),
      verify: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get(UserService);
    jwtService = module.get(JwtService);
  });

  describe('validateUser', () => {
    it('should successfully validate user with correct credentials', async () => {
      userService.findByUsername.mockResolvedValue(mockUser as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser('test@example.com', 'password');
      
      expect(result).toBeDefined();
      if (result) {
        expect(result.password).toBeUndefined();
        expect(result.email).toBe(mockUser.email);
      }
    });

    it('should return null for invalid credentials', async () => {
      userService.findByUsername.mockResolvedValue(mockUser as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.validateUser('test@example.com', 'wrongpassword');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should generate access and refresh tokens', async () => {
      const mockAccessToken = 'access-token';
      const mockRefreshToken = 'refresh-token';
      
      jwtService.sign
        .mockReturnValueOnce(mockAccessToken)
        .mockReturnValueOnce(mockRefreshToken);

      const result = await service.login({
        _id: mockObjectId,
        email: 'test@example.com',
        role: 'user',
        firstName: 'Test',
        lastName: 'User',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      expect(result).toEqual({
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
      });
    });
  });

  describe('refreshToken', () => {
    it('should generate new access token with valid refresh token', async () => {
      const mockPayload = {
        username: 'test@example.com',
        sub: mockObjectId.toString(),
        role: 'user',
      };
      const mockNewToken = 'new-access-token';

      jwtService.verify.mockReturnValue(mockPayload);
      jwtService.sign.mockReturnValue(mockNewToken);

      const result = await service.refreshToken('valid-refresh-token');

      expect(result).toEqual({
        accessToken: mockNewToken,
      });
    });
  });
});