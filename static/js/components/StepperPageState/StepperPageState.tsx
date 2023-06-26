import * as React from 'react';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProgressSteps } from '@multiversx/sdk-dapp/UI';

export const StepperPageState = ({
  icon,
  iconClass,
  iconBgClass,
  iconSize = '5x',
  containerClass = '',
  title,
  subTitle,
  description,
  action,
  dataTestId,
  currentStep,
  totalSteps
}: {
  icon?: IconProp;
  iconClass?: string;
  iconBgClass?: string;
  dataTestId?: string;
  iconSize?: SizeProp;
  containerClass?: string;
  title?: string;
  subTitle?: string;
  description?: string | React.ReactNode;
  action?: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}) => (
  <div
    className={`page-state m-auto p-spacer text-center ${containerClass}`}
    data-testid={dataTestId}
  >
    {title && <p className='h4 mb-spacer'>{title}</p>}
    <div className='mb-spacer'>
      <ProgressSteps totalSteps={totalSteps} currentStep={currentStep} />
    </div>
    {icon && (
      <span
        className={`icon-state mx-auto mb-spacer ${
          iconBgClass ? iconBgClass : ''
        }`}
      >
        <FontAwesomeIcon
          icon={icon}
          className={iconClass ? iconClass : ''}
          size={iconSize}
        />
      </span>
    )}
    {subTitle && <p className='h5 my-spacer'>{subTitle}</p>}
    {description && <div className='mb-spacer'>{description}</div>}
    {action && <>{action}</>}
  </div>
);
