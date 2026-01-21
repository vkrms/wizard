interface FormHeaderProps {
  title: string;
  description: string;
}

export function FormHeader({ title, description }: FormHeaderProps) {
  return (
    <div>
      <h1 className="text-[24px] sm:text-[32px] font-bold text-blue-950 leading-[1.7] mb-1 sm:mb-0">{title}</h1>
      <p className="text-base text-grey-500 leading-[1.6]">{description}</p>
    </div>
  );
}

