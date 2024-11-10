// jwt.strategy.ts
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "your_jwt_secret", // Replace with your secret or use environment variable
    });
  }

  async validate(payload: any) {
    console.log("payload", payload);
    console.log("hello");
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
