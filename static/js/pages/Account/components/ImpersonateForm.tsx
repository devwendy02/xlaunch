import React from 'react';
import { addressIsValid } from '@multiversx/sdk-dapp/utils/account/addressIsValid';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { object, string } from 'yup';
import { impersonateAddressSelector } from 'redux/selectors';
import { updateImpersonateAddress } from 'redux/slices';

export const ImpersonateForm = () => {
  const savedImpersonatedAddress = useSelector(impersonateAddressSelector);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      impersonatedAddress: savedImpersonatedAddress || ''
    },
    validationSchema: object().shape({
      impersonatedAddress: string()
        .required('Required')
        .test('validAddress', 'Not a valid address', (value: any) =>
          Boolean(value && addressIsValid(value))
        )
    }),
    onSubmit: ({ impersonatedAddress }) => {
      dispatch(updateImpersonateAddress(impersonatedAddress));
    }
  });

  const clearImpersonatedAddress = () => {
    setFieldValue('impersonatedAddress', '');
    setFieldTouched('impersonatedAddress', false);
    dispatch(updateImpersonateAddress(undefined));
  };

  const {
    handleSubmit,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    setFieldTouched
  } = formik;

  const { impersonatedAddress } = formik.values;

  const hasError = errors.impersonatedAddress && touched.impersonatedAddress;

  return (
    <form onSubmit={handleSubmit}>
      <div className='impersonate-fields'>
        <div className='impersonate-field'>
          <label htmlFor='impersonatedAddress'>See Account as:</label>

          <input
            type='text'
            id='impersonatedAddress'
            name='impersonatedAddress'
            placeholder='Address'
            disabled={Boolean(savedImpersonatedAddress)}
            onChange={handleChange}
            onBlur={handleBlur}
            value={impersonatedAddress}
            className={classNames('form-control', 'impersonate-input', {
              invalid: hasError
            })}
          />

          {hasError && (
            <div
              className='impersonate-error'
              data-testid='invalidImpersonatedAddress'
            >
              {errors.impersonatedAddress}
            </div>
          )}
        </div>

        <button
          className='btn btn-primary modal-layout-button align-self-right m-2 mx-1'
          type='submit'
        >
          Submit
        </button>

        {Boolean(savedImpersonatedAddress) && (
          <button
            className='btn btn-primary  modal-layout-button align-self-right m-2 mx-1'
            onClick={clearImpersonatedAddress}
          >
            Cancel Impersonation
          </button>
        )}
      </div>
    </form>
  );
};
