import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SuccessScreenProps {
  message: string;
  onReset: () => void;
}

export function SuccessScreen({ message, onReset }: SuccessScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <Card className="animate-success-pop max-w-md w-full text-center">
        <CardHeader className="items-center pb-2">
          <div
            className="mb-2 flex size-16 items-center justify-center rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, hsl(12 95% 62% / 0.2), hsl(330 90% 58% / 0.2))",
              boxShadow: "0 0 40px hsl(330 90% 58% / 0.25)",
            }}
            aria-hidden
          >
            <span className="text-3xl">✓</span>
          </div>
          <CardTitle className="text-gradient text-3xl">{message}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Ваши ответы сохранены. Спасибо, что уделили время — это очень ценно!
          </p>
          <Button onClick={onReset} variant="outline" size="lg" className="w-full">
            Пройти снова
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
