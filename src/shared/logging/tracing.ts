'use strict';
import process from 'process';
import { BatchSpanProcessor, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { TraceExporter } from '@google-cloud/opentelemetry-cloud-trace-exporter';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { WinstonInstrumentation } from '@opentelemetry/instrumentation-winston';
import { Environment } from '../types/be-curatordb.enums';
import { Logger } from './logger';
import { getEnv, getPackageInfo } from '../../utils';

const env = getEnv();
const { packageName, packageVersion } = getPackageInfo();
Logger.debug(`[Initializing OtelSDK] For ${JSON.stringify({ packageName, packageVersion }, null, 2)}`);

const jaegerExporter = new JaegerExporter({
  endpoint: 'http://localhost:14268/api/traces',
});

const gctExporter = new TraceExporter();
const traceExporter = env.NODE_ENV === Environment.LOCAL ? jaegerExporter : gctExporter;

const spanProcessor =
  env.NODE_ENV === Environment.LOCAL ? new SimpleSpanProcessor(traceExporter) : new BatchSpanProcessor(traceExporter);

const resource = Resource.default().merge(
  new Resource({
    application: packageName,
    [SemanticResourceAttributes.SERVICE_NAMESPACE]: 'curatodb',
    [SemanticResourceAttributes.SERVICE_NAME]: packageName,
    [SemanticResourceAttributes.SERVICE_VERSION]: packageVersion,
  }),
);

process.on('SIGTERM', () => {
  otelSDK
    .shutdown()
    .then(
      () => Logger.debug('OpenTelemetry SDK shut down successfully'),
      (err) => Logger.error('Error shutting down OpenTelemetry SDK ' + err.message),
    )
    .finally(() => process.exit(0));
});

export const otelSDK = new NodeSDK({
  resource,
  spanProcessor,
  instrumentations: [
    getNodeAutoInstrumentations(),
    new WinstonInstrumentation({
      enabled: true,
    }),
  ],
});
