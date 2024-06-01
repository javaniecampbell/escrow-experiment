import { WebTracerProvider, ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';


const zoneManager = new ZoneContextManager().enable();
const provider = new WebTracerProvider();
provider.register({
    contextManager: zoneManager,
});

const exporter = new ConsoleSpanExporter();
const spanProcessor = new SimpleSpanProcessor(exporter);
provider.addSpanProcessor(spanProcessor);
provider.register();


function getTracer(name: string, version?: string): any {
    return provider.getTracer(name, version);
}

const tracer = getTracer('escrow-dashboard');

export { tracer };