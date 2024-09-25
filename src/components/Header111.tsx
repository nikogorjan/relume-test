import { Button, Heading, Text } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";

type ImageProps = {
  src: string;
  alt?: string;
};



type Props = {
  heading: string;
  description: string;
  buttons: ButtonProps[];
  image: ImageProps;
};

export type Header111Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Header111 = (props: Header111Props) => {
  const { heading, description, buttons, image } = {
    ...Header111Defaults,
    ...props,
  } as Props;

  return (
    <section id="relume" className="relative px-[5%]">
      <div className="container">
        <div className="flex max-h-[60rem] min-h-svh py-16 md:py-24 lg:py-28 grid grid-cols-1 items-start gap-5 md:grid-cols-2 md:gap-20 lg:gap-20 overflow-x-auto">
          <div className="text-left text-white">
            <Heading headingSize="h1">{heading}</Heading>
          </div>
          <div className="mx-[7.5%] flex flex-col justify-end h-full space-y-0 text-white">
            <Text>{description}</Text>
            <div className="flex flex-wrap gap-4 mt-8 md:mt-4"> 
              {buttons.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10">
        <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </section>
  );
};

export const Header111Defaults: Header111Props = {
  heading: "Medium length hero heading goes here",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  buttons: [{ title: "Button" }, { title: "Button", variant: "secondary-alt" }],
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
    alt: "Placeholder background image",
  },
};