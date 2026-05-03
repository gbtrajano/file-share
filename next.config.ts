import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `bodyParser` foi removido no Next.js 16; o upload via server actions já usa
  // o limite de corpo padrão e deve ser tratado no código do servidor.
};

export default nextConfig;
