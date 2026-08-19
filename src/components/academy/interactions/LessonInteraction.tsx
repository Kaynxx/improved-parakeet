import { DurationConvexityLab } from "@/components/academy/interactions/DurationConvexityLab";
import { THesapLab } from "@/components/academy/interactions/THesapLab";
import { TufeSepetiLab } from "@/components/academy/interactions/TufeSepetiLab";
import type { EtkilesimYapilandirmasi } from "@/lib/content/interactions";

interface LessonInteractionProps {
  config: EtkilesimYapilandirmasi;
}

/**
 * Etkileşim yapılandırmasına göre ilgili laboratuvar bileşenini render eden dağıtıcı (dispatcher).
 * Kapalı registry mantığıyla çalışır; yeni bir tür eklendiğinde switch bloğunun güncellenmesi gerekir.
 */
export function LessonInteraction({ config }: LessonInteractionProps) {
  switch (config.tur) {
    case "t-hesap":
      return <THesapLab config={config} />;
    case "durasyon-konveksite":
      return <DurationConvexityLab config={config} />;
    case "tufe-sepeti":
      return <TufeSepetiLab config={config} />;
    default:
      // TypeScript'in exhaustiveness check (kapsamlılık kontrolü) özelliği.
      // Yeni bir tür eklendiğinde ve burada işlenmediğinde derleme hatası verir.
      config satisfies never;
      return null;
  }
}
