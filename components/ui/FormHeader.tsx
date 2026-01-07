interface FormHeaderProps {
  title: string;
  description: string;
}

export function FormHeader({ title, description }: FormHeaderProps) {
  return (
    <div>
      <h1 className="text-[32px] font-bold text-marine-blue">{title}</h1>
      <p className="mt-2 text-base text-cool-gray">{description}</p>
    </div>
  );
}

