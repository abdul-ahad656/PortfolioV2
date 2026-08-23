export type Layer = 'intelligence' | 'application' | 'data' | 'infrastructure';

export interface Technology {
  id: string;
  name: string;
  layer: Layer;
  related: string[];
  float: { x: number; y: number; depth: number };
  arch: { x: number; y: number };
  mobile?: boolean;
}

export interface LayerMeta {
  id: Layer;
  index: string;
  label: string;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
}

export const layers: LayerMeta[] = [
  { id: 'intelligence', index: '01', label: 'INTELLIGENCE' },
  { id: 'application', index: '02', label: 'APPLICATION' },
  { id: 'data', index: '03', label: 'DATA' },
  { id: 'infrastructure', index: '04', label: 'INFRASTRUCTURE' },
];

export const technologies: Technology[] = [
  // Intelligence
  {
    id: 'python',
    name: 'Python',
    layer: 'intelligence',
    related: ['pytorch', 'rag', 'fastapi', 'llm-agents', 'langchain'],
    float: { x: 48, y: 18, depth: 0.8 },
    arch: { x: 50, y: 12 },
    mobile: true,
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    layer: 'intelligence',
    related: ['python', 'huggingface', 'faiss', 'rag'],
    float: { x: 22, y: 28, depth: 1.2 },
    arch: { x: 32, y: 22 },
    mobile: true,
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    layer: 'intelligence',
    related: ['python', 'pytorch', 'rag'],
    float: { x: 72, y: 26, depth: 0.6 },
    arch: { x: 68, y: 22 },
  },
  {
    id: 'rag',
    name: 'RAG',
    layer: 'intelligence',
    related: ['python', 'faiss', 'chromadb', 'langchain', 'openai'],
    float: { x: 50, y: 32, depth: 1.0 },
    arch: { x: 50, y: 28 },
    mobile: true,
  },
  {
    id: 'llm-agents',
    name: 'LLM Agents',
    layer: 'intelligence',
    related: ['python', 'openai', 'langchain'],
    float: { x: 78, y: 38, depth: 1.4 },
    arch: { x: 72, y: 34 },
    mobile: true,
  },
  {
    id: 'openai',
    name: 'OpenAI API',
    layer: 'intelligence',
    related: ['langchain', 'rag', 'llm-agents'],
    float: { x: 18, y: 42, depth: 0.5 },
    arch: { x: 28, y: 34 },
  },
  {
    id: 'langchain',
    name: 'LangChain',
    layer: 'intelligence',
    related: ['python', 'rag', 'openai', 'chromadb'],
    float: { x: 62, y: 44, depth: 0.9 },
    arch: { x: 58, y: 34 },
  },

  // Application
  {
    id: 'nextjs',
    name: 'Next.js',
    layer: 'application',
    related: ['react', 'typescript', 'node'],
    float: { x: 28, y: 52, depth: 1.1 },
    arch: { x: 28, y: 48 },
    mobile: true,
  },
  {
    id: 'react',
    name: 'React',
    layer: 'application',
    related: ['nextjs', 'typescript'],
    float: { x: 52, y: 54, depth: 0.7 },
    arch: { x: 42, y: 48 },
    mobile: true,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    layer: 'application',
    related: ['nextjs', 'react', 'node'],
    float: { x: 74, y: 50, depth: 1.3 },
    arch: { x: 58, y: 48 },
  },
  {
    id: 'node',
    name: 'Node.js',
    layer: 'application',
    related: ['express', 'nextjs', 'mongodb'],
    float: { x: 38, y: 62, depth: 0.6 },
    arch: { x: 72, y: 48 },
    mobile: true,
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    layer: 'application',
    related: ['python', 'postgresql', 'redis'],
    float: { x: 58, y: 64, depth: 1.0 },
    arch: { x: 72, y: 58 },
    mobile: true,
  },
  {
    id: 'express',
    name: 'Express',
    layer: 'application',
    related: ['node', 'mongodb'],
    float: { x: 82, y: 62, depth: 0.8 },
    arch: { x: 82, y: 58 },
  },
  {
    id: 'flask',
    name: 'Flask',
    layer: 'application',
    related: ['python'],
    float: { x: 14, y: 58, depth: 1.5 },
    arch: { x: 18, y: 58 },
  },

  // Data
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    layer: 'data',
    related: ['fastapi', 'pgvector'],
    float: { x: 32, y: 72, depth: 0.9 },
    arch: { x: 38, y: 68 },
    mobile: true,
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    layer: 'data',
    related: ['node', 'express'],
    float: { x: 55, y: 74, depth: 1.2 },
    arch: { x: 50, y: 68 },
  },
  {
    id: 'faiss',
    name: 'FAISS',
    layer: 'data',
    related: ['rag', 'pytorch', 'chromadb'],
    float: { x: 68, y: 70, depth: 0.5 },
    arch: { x: 62, y: 68 },
    mobile: true,
  },
  {
    id: 'chromadb',
    name: 'ChromaDB',
    layer: 'data',
    related: ['rag', 'langchain'],
    float: { x: 44, y: 78, depth: 1.4 },
    arch: { x: 72, y: 68 },
  },
  {
    id: 'pgvector',
    name: 'pgvector',
    layer: 'data',
    related: ['postgresql', 'rag'],
    float: { x: 20, y: 76, depth: 0.7 },
    arch: { x: 28, y: 68 },
  },
  {
    id: 'redis',
    name: 'Redis',
    layer: 'data',
    related: ['fastapi'],
    float: { x: 86, y: 74, depth: 1.0 },
    arch: { x: 82, y: 68 },
  },

  // Infrastructure
  {
    id: 'docker',
    name: 'Docker',
    layer: 'infrastructure',
    related: ['cloud-run', 'cicd', 'linux'],
    float: { x: 36, y: 86, depth: 0.8 },
    arch: { x: 35, y: 82 },
    mobile: true,
  },
  {
    id: 'cloud-run',
    name: 'Cloud Run',
    layer: 'infrastructure',
    related: ['docker', 'cicd', 'gcp'],
    float: { x: 52, y: 88, depth: 1.1 },
    arch: { x: 50, y: 82 },
    mobile: true,
  },
  {
    id: 'cicd',
    name: 'CI/CD',
    layer: 'infrastructure',
    related: ['docker', 'cloud-run', 'git'],
    float: { x: 66, y: 84, depth: 0.6 },
    arch: { x: 65, y: 82 },
  },
  {
    id: 'git',
    name: 'Git',
    layer: 'infrastructure',
    related: ['cicd'],
    float: { x: 78, y: 88, depth: 1.3 },
    arch: { x: 78, y: 82 },
    mobile: true,
  },
  {
    id: 'aws',
    name: 'AWS',
    layer: 'infrastructure',
    related: ['docker', 'linux'],
    float: { x: 24, y: 88, depth: 0.5 },
    arch: { x: 22, y: 82 },
  },
  {
    id: 'linux',
    name: 'Linux',
    layer: 'infrastructure',
    related: ['docker', 'aws'],
    float: { x: 12, y: 84, depth: 1.0 },
    arch: { x: 12, y: 82 },
  },
];

export const architectureEdges: ArchitectureEdge[] = [
  { from: 'python', to: 'pytorch' },
  { from: 'python', to: 'rag' },
  { from: 'python', to: 'fastapi' },
  { from: 'python', to: 'llm-agents' },
  { from: 'rag', to: 'faiss' },
  { from: 'rag', to: 'chromadb' },
  { from: 'langchain', to: 'rag' },
  { from: 'openai', to: 'llm-agents' },
  { from: 'nextjs', to: 'react' },
  { from: 'nextjs', to: 'typescript' },
  { from: 'react', to: 'typescript' },
  { from: 'node', to: 'express' },
  { from: 'fastapi', to: 'postgresql' },
  { from: 'fastapi', to: 'redis' },
  { from: 'express', to: 'mongodb' },
  { from: 'postgresql', to: 'pgvector' },
  { from: 'docker', to: 'cloud-run' },
  { from: 'docker', to: 'cicd' },
  { from: 'cicd', to: 'git' },
  { from: 'cloud-run', to: 'cicd' },
];

export function getTechnologyById(id: string): Technology | undefined {
  return technologies.find((t) => t.id === id);
}

export function getRelatedSet(activeId: string | null): Set<string> {
  if (!activeId) return new Set();
  const tech = getTechnologyById(activeId);
  if (!tech) return new Set();
  return new Set([activeId, ...tech.related]);
}

export function getTechnologiesForViewport(mobile: boolean): Technology[] {
  if (!mobile) return technologies;
  return technologies.filter((t) => t.mobile);
}

export function getLayerFromProgress(progress: number): Layer {
  if (progress < 0.42) return 'intelligence';
  if (progress < 0.62) return 'application';
  if (progress < 0.88) return 'data';
  return 'infrastructure';
}

export function getStackIndexFromProgress(progress: number): string {
  if (progress < 0.18) return '00';
  if (progress < 0.42) return '01';
  if (progress < 0.62) return '02';
  if (progress < 0.88) return '03';
  return '04';
}
