import * as joi from 'joi';
import { EnvVarsI } from '../entities/interfaces/EnvVarsI';

export const EnvVarsValidator = joi
  .object<EnvVarsI>({
    PORT: joi.number().required(),
    AUTH_HOST: joi.string().required(),
    AUTH_PORT: joi.number().required(),
    NOTES_HOST: joi.string().required(),
    NOTES_PORT: joi.number().required(),
  })
  .unknown(true);
