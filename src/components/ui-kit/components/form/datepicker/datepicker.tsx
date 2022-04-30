import React, { FC, Fragment, useState } from 'react';
import { WithStyle } from '../../../utils';
import { FormDatepickerProps } from './types';
import {
  FormDatepickerStyled,
  FormDatepickerInputStyled,
  FormDatepickerPrevIconStyled,
  FormDatepickerNextIconStyled,
  FormDatepickerIconStyled,
  FormDatepickerSelectStyled,
  CloseButtonStyled,
  CloseBackgroundStyled,
} from './datepicker.styled';
import { InputGroup } from '../../input-group';
import { Icon } from '../../icon';
import { CustomField } from 'react-uforms';
import DatePicker from 'react-datepicker';
import InputMask from 'react-input-mask';
import { DateTime, Info } from 'luxon';
import { Box } from '../../box';
import { Text } from '../../text';
import { Col, GridThemeProvider, Row } from 'styled-bootstrap-grid';
import useOnclickOutside from 'react-cool-onclickoutside';

export const FormDatepicker: FC<FormDatepickerProps> & WithStyle = (props) => {
  const [isCalendarOpen, setCalendarOpenState] = useState(false);

  const ref = useOnclickOutside(() => {
    setCalendarOpenState(false);
  });

  const renderCustomHeaderDefault: FC<{
    date: Date;
    changeYear(year: number): void;
    changeMonth(month: number): void;
    decreaseMonth(): void;
    increaseMonth(): void;
    prevMonthButtonDisabled: boolean;
    nextMonthButtonDisabled: boolean;
    decreaseYear(): void;
    increaseYear(): void;
    prevYearButtonDisabled: boolean;
    nextYearButtonDisabled: boolean;
  }> = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => {
    const yearsList = [];
    let minYear = 100;
    let maxYear = 50;

    // start to calculate month in dropdown
    let monthsDiff = parseInt(
      `${DateTime.fromJSDate(props.maxDate).diff(DateTime.fromJSDate(props.minDate), ['months']).months}`,
    );

    const getMonthFromString = (mon: string): number => {
      return new Date(Date.parse(mon + ' 1, 2012')).getMonth() + 1;
    };

    const getMonthList = (selectedYear: number) => {
      // if we have minDate or maxDate then in that year we shouldn't show whole month in months dropdown
      const newMonths = [];
      if (
        (props.minDate && DateTime.fromJSDate(props.minDate).year === selectedYear) ||
        (props.maxDate && DateTime.fromJSDate(props.maxDate).year === selectedYear)
      ) {
        if (DateTime.fromJSDate(props.minDate).year === DateTime.fromJSDate(props.maxDate).year) {
          // if minDate and maxDate in one year, then show only difference between months
          monthsDiff = DateTime.fromJSDate(props.maxDate).month - DateTime.fromJSDate(props.minDate).month;
        } else {
          if (selectedYear === DateTime.fromJSDate(props.minDate).year) {
            monthsDiff = 12 - DateTime.fromJSDate(props.minDate).month;
          } else {
            monthsDiff = -DateTime.fromJSDate(props.maxDate).month;
          }
        }

        if (monthsDiff >= 0) {
          for (let i = 0; i <= monthsDiff; i += 1) {
            const month = DateTime.fromJSDate(props.minDate).plus({ month: i }).monthLong;
            newMonths.push(month);
          }
        } else {
          for (let i = 0; i > monthsDiff; i -= 1) {
            newMonths.push(Info.months()[i * -1]);
          }
        }

        return newMonths;
      } else {
        return Info.months();
      }
    };

    const monthsList = getMonthList(DateTime.fromJSDate(date).year);

    // finish calculate month. start to calculate years

    if (props.minDate) {
      minYear = DateTime.local().year - DateTime.fromJSDate(props.minDate).year;

      if (!props.maxDate) {
        maxYear = minYear > 50 ? 50 : 50 - minYear;
      }
    }

    if (props.maxDate) {
      maxYear = DateTime.fromJSDate(props.maxDate).year - DateTime.local().year;

      if (!props.minDate) {
        minYear = maxYear > 50 ? 50 : 50 - maxYear;
      }
    }

    for (let i = DateTime.local().year + maxYear; i >= DateTime.local().year - minYear; i--) {
      yearsList.push(
        <option value={i} key={`year-${i}`}>
          {i}
        </option>,
      );
    }
    // finish calculate years

    return (
      <Fragment>
        <Box bg="gray400" p={[10]} mb={10}>
          <Text m={[0]} measure="sm" color="black" fontWeight="bold">
            select a date
          </Text>
          <CloseButtonStyled
            variant="flat"
            onClick={() => {
              setCalendarOpenState(false);
            }}
          >
            <Icon name="close" measure={13} />
          </CloseButtonStyled>
        </Box>
        <GridThemeProvider
          gridTheme={{
            gridColumns: 7,
            row: {
              padding: 5,
            },
            col: {
              padding: 5,
            },
          }}
        >
          <Row>
            <Col col={1}>
              <FormDatepickerPrevIconStyled variant="link" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                <FormDatepickerIconStyled name="angle" color="gray800" />
              </FormDatepickerPrevIconStyled>
            </Col>
            <Col col={3}>
              <FormDatepickerSelectStyled>
                <select
                  value={DateTime.fromJSDate(date).month}
                  onChange={({ target: { value } }) => changeMonth(+value - 1)}
                  id="monthSelect"
                >
                  {monthsList.map((label) => (
                    <option key={label} value={Info.months().indexOf(label) + 1}>
                      {label}
                    </option>
                  ))}
                </select>
                <Icon name="angle" measure={8} />
              </FormDatepickerSelectStyled>
            </Col>
            <Col col={2}>
              <FormDatepickerSelectStyled>
                <select
                  value={DateTime.fromJSDate(date).year}
                  onChange={({ target: { value } }) => {
                    changeYear(Number(value));
                    // change selected month in month list
                    if (
                      (props.minDate && DateTime.fromJSDate(props.minDate).year === +value) ||
                      (props.maxDate && DateTime.fromJSDate(props.maxDate).year === +value)
                    ) {
                      const curDate = DateTime.fromJSDate(date).toObject();
                      const minMonth = getMonthFromString(getMonthList(+value)[0]);

                      if (+value > curDate.year) {
                        for (let i = minMonth; i < curDate.month; i += 1) {
                          decreaseMonth();
                        }
                      } else {
                        for (let i = minMonth; i > curDate.month; i -= 1) {
                          increaseMonth();
                        }
                      }
                    }
                  }}
                >
                  {yearsList}
                </select>
                <Icon name="angle" measure={8} />
              </FormDatepickerSelectStyled>
            </Col>
            <Col col={1}>
              <FormDatepickerNextIconStyled variant="link" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                <FormDatepickerIconStyled name="angle" color="gray800" />
              </FormDatepickerNextIconStyled>
            </Col>
          </Row>
        </GridThemeProvider>
      </Fragment>
    );
  };
  return (
    <div ref={ref}>
      {!props.isNative && isCalendarOpen && (
        <CloseBackgroundStyled
          onClick={() => {
            setCalendarOpenState(false);
          }}
        />
      )}
      <InputGroup>
        <InputGroup.Block>
          <FormDatepickerStyled {...props} />
          <CustomField name={props.name} hideError={true}>
            {({ setValue, getValue, setTouched }) =>
              props.isNative ? (
                <FormDatepickerInputStyled
                  disabled={props.disabled}
                  id={props.id}
                  type="date"
                  className="form-control"
                  value={getValue() ? getValue() : undefined}
                  autoComplete="off"
                  placeholder={props.placeholderText}
                  onChange={(event) => {
                    const { value } = event.target;
                    const date = value ? DateTime.fromISO(value).toFormat(props.outputDateFormat) : null;
                    setValue(date, () => {
                      if (props.onChange) {
                        props.onChange(date, event);
                      }
                      setTouched();
                    });
                  }}
                  min={props.minDate ? DateTime.fromJSDate(props.minDate).toFormat(props.dateFormat) : null}
                  max={props.maxDate ? DateTime.fromJSDate(props.maxDate).toFormat(props.dateFormat) : null}
                />
              ) : (
                <DatePicker
                  {...props}
                  onFocus={() => {
                    setCalendarOpenState(true);
                  }}
                  readOnly={props.isMobile ? true : props.readOnly}
                  customInput={
                    <InputMask type="text" mask={props.mask} readOnly={props.isMobile ? true : props.readOnly} />
                  }
                  selected={getValue() ? DateTime.fromISO(getValue()).toJSDate() : null}
                  onChange={(value, event) => {
                    setCalendarOpenState(false);
                    const date = value ? DateTime.fromJSDate(value).toFormat(props.outputDateFormat) : null;
                    setValue(date, () => {
                      if (props.onChange) {
                        props.onChange(date, event);
                      }
                    });
                    setTouched();
                  }}
                  open={isCalendarOpen}
                  renderCustomHeader={props.renderCustomHeader || renderCustomHeaderDefault}
                />
              )
            }
          </CustomField>
        </InputGroup.Block>
        <InputGroup.Addon
          bg="white"
          onClick={() => {
            setCalendarOpenState(true);
          }}
        >
          <label htmlFor={props.id}>
            <Icon name="calendar" measure={18} />
          </label>
        </InputGroup.Addon>
      </InputGroup>
    </div>
  );
};

FormDatepicker.defaultProps = {
  disabledKeyboardNavigation: true,
  useWeekdaysShort: true,
  readOnly: false,
  autoComplete: 'off',
  popperPlacement: 'bottom-start',
  mask: '99/99/9999',
  dateFormat: 'MM/dd/yyyy',
  outputDateFormat: 'yyyy-MM-dd',
};

FormDatepicker.displayName = 'FormDatepicker';
