import type { CSSProperties, ComponentType } from 'react';
import {
  siDocker,
  siFastapi,
  siGit,
  siGooglecloud,
  siHuggingface,
  siJavascript,
  siJupyter,
  siKeras,
  siKubernetes,
  siLangchain,
  siMediapipe,
  siMlflow,
  siNumpy,
  siPandas,
  siPhp,
  siPython,
  siPytorch,
  siScikitlearn,
  siSpacy,
  siStreamlit,
  siTensorflow,
} from 'simple-icons';
import { Cloud, Database, FlowArrow } from '@phosphor-icons/react';

type PhosphorWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';

type PhosphorIconComponent = ComponentType<{
  className?: string;
  weight?: PhosphorWeight;
  style?: CSSProperties;
}>;

type SvgBrandIcon = {
  kind: 'svg';
  path: string;
  color: string;
  darkColor?: string;
};

type PhosphorBrandIcon = {
  kind: 'phosphor';
  phosphor: PhosphorIconComponent;
  color: string;
  darkColor?: string;
};

type BrandIcon = SvgBrandIcon | PhosphorBrandIcon;

const iconMap: Record<string, BrandIcon> = {
  python: { kind: 'svg', path: siPython.path, color: '#3776AB' },
  php: { kind: 'svg', path: siPhp.path, color: '#777BB4' },
  sql: { kind: 'phosphor', phosphor: Database, color: '#2563EB' },
  javascript: { kind: 'svg', path: siJavascript.path, color: '#F7DF1E', darkColor: '#F7DF1E' },
  langgraph: { kind: 'phosphor', phosphor: FlowArrow, color: '#111827', darkColor: '#F3F4F6' },
  langchain: { kind: 'svg', path: siLangchain.path, color: '#1C3C3C', darkColor: '#D1FAE5' },
  tensorflow: { kind: 'svg', path: siTensorflow.path, color: '#FF6F00' },
  pytorch: { kind: 'svg', path: siPytorch.path, color: '#EE4C2C' },
  scikitlearn: { kind: 'svg', path: siScikitlearn.path, color: '#F7931E' },
  pandas: { kind: 'svg', path: siPandas.path, color: '#150458', darkColor: '#E9D5FF' },
  numpy: { kind: 'svg', path: siNumpy.path, color: '#013243' },
  keras: { kind: 'svg', path: siKeras.path, color: '#D00000' },
  nltk: { kind: 'phosphor', phosphor: FlowArrow, color: '#4B5563', darkColor: '#D1D5DB' },
  spacy: { kind: 'svg', path: siSpacy.path, color: '#09A3D5' },
  huggingface: { kind: 'svg', path: siHuggingface.path, color: '#FFD21E' },
  mediapipe: { kind: 'svg', path: siMediapipe.path, color: '#0097A7' },
  gcp: { kind: 'svg', path: siGooglecloud.path, color: '#4285F4' },
  azure: { kind: 'phosphor', phosphor: Cloud, color: '#0078D4' },
  oracle: { kind: 'phosphor', phosphor: Cloud, color: '#C74634' },
  docker: { kind: 'svg', path: siDocker.path, color: '#2496ED' },
  kubernetes: { kind: 'svg', path: siKubernetes.path, color: '#326CE5' },
  git: { kind: 'svg', path: siGit.path, color: '#F05032' },
  mlflow: { kind: 'svg', path: siMlflow.path, color: '#0194E2' },
  jupyter: { kind: 'svg', path: siJupyter.path, color: '#F37626' },
  streamlit: { kind: 'svg', path: siStreamlit.path, color: '#FF4B4B' },
  fastapi: { kind: 'svg', path: siFastapi.path, color: '#009688' },
};

/** Renders a brand/skill glyph with light and dark color variants. */
export function SkillIcon({ logo }: { logo: string }) {
  const icon = iconMap[logo];
  if (!icon) {
    return null;
  }

  if (icon.kind === 'phosphor') {
    const Phosphor = icon.phosphor;
    return (
      <>
        <Phosphor className="h-4 w-4 dark:hidden" weight="duotone" style={{ color: icon.color }} />
        <Phosphor
          className="hidden h-4 w-4 dark:block"
          weight="duotone"
          style={{ color: icon.darkColor || icon.color }}
        />
      </>
    );
  }

  return (
    <>
      <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill={icon.color} className="dark:hidden">
        <path d={icon.path} />
      </svg>
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        fill={icon.darkColor || icon.color}
        className="hidden dark:block"
      >
        <path d={icon.path} />
      </svg>
    </>
  );
}
