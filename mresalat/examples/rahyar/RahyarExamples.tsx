import { UnavailableProduct } from '../product/ProductExampleShell';

export function YourRahyar() { return <UnavailableProduct serviceId="your-rahyar" />; }
export function RahyarIdCard() { return <UnavailableProduct serviceId="rahyar-id-lookup" />; }
export const rahyarScreens: Record<string, React.ComponentType> = { 'id-card': RahyarIdCard };
