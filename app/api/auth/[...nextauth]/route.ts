import { handlers } from '@/auth';

// Type cast needed: next-auth@5 beta AppRouteHandlers doesn't yet satisfy
// Next.js 16's stricter RouteHandlerConfig constraint.
export const { GET, POST } = handlers as any;
