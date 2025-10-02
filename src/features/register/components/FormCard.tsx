import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function FormCard({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Card className="w-full max-w-sm bg-stone-300">
      <CardHeader>
        <CardTitle className="text-gray-600">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
