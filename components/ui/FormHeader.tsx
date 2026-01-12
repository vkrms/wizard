interface FormHeaderProps {
  title: string;
  description: string;
}

export function FormHeader({ title, description }: FormHeaderProps) {
  return (
    <div>
      <h1 className="text-[32px] font-bold text-blue-950">{title}</h1>
      <p className="mt-2 text-base text-grey-500">{description}</p>
    </div>
  );
}

