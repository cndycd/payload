'use client'
import type { TextareaFieldClientComponent, TextareaFieldValidation } from 'payload'

import { getTranslation } from '@payloadcms/translations'
import React, { useCallback } from 'react'

import type { TextAreaInputProps } from './types.js'

import { useField } from '../../forms/useField/index.js'
import { withCondition } from '../../forms/withCondition/index.js'
import { useConfig } from '../../providers/Config/index.js'
import { useLocale } from '../../providers/Locale/index.js'
import { useTranslation } from '../../providers/Translation/index.js'
import { isFieldRTL } from '../shared/index.js'
import './index.scss'
import { TextareaInput } from './Input.js'

export { TextareaInput, TextAreaInputProps }

const TextareaFieldComponent: TextareaFieldClientComponent = (props) => {
  const {
    field: {
      name,
      admin: { className, description, placeholder, rows, rtl, style, width } = {},
      label,
      localized,
      maxLength,
      minLength,
      required,
    },
    path,
    readOnly,
    validate,
  } = props

  const { i18n } = useTranslation()

  const {
    config: { localization },
  } = useConfig()

  const locale = useLocale()

  const isRTL = isFieldRTL({
    fieldLocalized: localized,
    fieldRTL: rtl,
    locale,
    localizationConfig: localization || undefined,
  })

  const memoizedValidate: TextareaFieldValidation = useCallback(
    (value, options) => {
      if (typeof validate === 'function') {
        return validate(value, { ...options, maxLength, minLength, required })
      }
    },
    [validate, required, maxLength, minLength],
  )

  const {
    customComponents: { AfterInput, BeforeInput, Description, Error, Label } = {},
    setValue,
    showError,
    value,
  } = useField<string>({
    path,
    validate: memoizedValidate,
  })

  return (
    <TextareaInput
      AfterInput={AfterInput}
      BeforeInput={BeforeInput}
      className={className}
      Description={Description}
      description={description}
      Error={Error}
      Label={Label}
      label={label}
      localized={localized}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      path={path}
      placeholder={getTranslation(placeholder, i18n)}
      readOnly={readOnly}
      required={required}
      rows={rows}
      rtl={isRTL}
      showError={showError}
      style={style}
      value={value}
      width={width}
    />
  )
}

export const TextareaField = withCondition(TextareaFieldComponent)
