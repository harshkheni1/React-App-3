export interface OptionPlanProps {
  id?: string;
  value?: any;
  label: string;
  name?: string;
  /** is radiobutton or checkbox **/
  radio?: boolean;
  disabled?: boolean;
  /** Hover text on disabled options **/
  onChange?: () => void;
  onClick?: () => void;
  required?: boolean;
  className?: string;
  children?: any;
  /** Component without input **/
  simpleElement?: boolean;
  logo?: string;
  status?: any;
}
