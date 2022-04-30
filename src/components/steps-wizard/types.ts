export interface StepInterface {
  name: string;
  component: React.ReactNode;
  nextButtonText?: string;
}

export interface StepButtonInterface {
  onClick: (name?: string) => void;
  isDisabled?: (name: string) => boolean;
}
