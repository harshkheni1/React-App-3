import React, { useState, Fragment } from 'react';
import { CustomField } from 'react-uforms';
import { levenshtein, validateEmail } from '../../../utils';
import { emailDomains } from '../../../const';
import { Box } from '../../box';
import { Text } from '../../text';
import { A } from '../../link';
import { FormInputStyled } from './input.styled';
import { FormInputEmailProps } from './types';

export const FormInputEmail: React.FC<FormInputEmailProps> = (props) => {
  const {
    name,
    id,
    type = 'email',
    disabled,
    required,
    measure,
    placeholder,
    onChange,
    min,
    max,
    step,
    hideError,
  } = props;
  const [suggestionDomains, setSuggestionDomains] = useState([]);
  const handleChange = (value: any) => {
    if (validateEmail(value)) {
      const [emailName, emailDomain] = value.split('@', 2);
      const sd = emailDomains.reduce((accumulator, ed) => {
        if (accumulator.length === 0) {
          const score = levenshtein(ed, emailDomain, {});
          if (score < 4) {
            accumulator.push({
              domainSuggestion: ed,
              email: {
                name: emailName,
                domain: emailDomain,
              },
              score,
            });
          }
        }
        return accumulator;
      }, []);
      setSuggestionDomains(sd);
    } else {
      setSuggestionDomains([]);
    }
  };

  return (
    <CustomField name={name} hideError={hideError}>
      {({ setValue, setTouched }) => (
        <Fragment>
          <FormInputStyled
            {...{ name, id, type, disabled, required, measure, placeholder, onChange, min, max, step }}
            type="email"
            id={id}
            name={name}
            onChange={(event: any) => {
              const { value: newValue } = event.target;
              setValue(newValue);
              handleChange(newValue);
            }}
            onBlur={(event) => {
              event.persist();
              setTouched();
            }}
            placeholder={placeholder}
            hideError={hideError}
          />
          {suggestionDomains.length > 0 && suggestionDomains[0].score > 0 && (
            <Box mt={8}>
              <A
                underline={false}
                measure="xs"
                fontWeight="light"
                onClick={() => {
                  const correctEmail = `${suggestionDomains[0].email.name}@${suggestionDomains[0].domainSuggestion}`;
                  setValue(correctEmail);
                  setSuggestionDomains([]);
                }}
              >
                Maybe you mean
                <Text
                  as="span"
                  color="success"
                  measure="xs"
                  fontWeight="light"
                  ml={3}
                  mr={3}
                >{`${suggestionDomains[0].email.name}@${suggestionDomains[0].domainSuggestion}`}</Text>
                ?
              </A>
            </Box>
          )}
        </Fragment>
      )}
    </CustomField>
  );
};

FormInputEmail.defaultProps = {
  measure: 'md',
  disabled: false,
  required: false,
  hideError: true,
  placeholder: 'Enter',
};
