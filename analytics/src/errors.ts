import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export enum AppExceptionType {
  DUPLICATE_ENTRY = 'Duplicate entry',
}

export class AppException extends ConflictException {
  type: AppExceptionType;
  constructor(type: AppExceptionType, description?: string) {
    super(type, description);
    this.type = type;
  }

  isType(type: AppExceptionType) {
    return this.type === type;
  }
}

export class DuplicateEntryException extends AppException {
  constructor(description?: string) {
    super(AppExceptionType.DUPLICATE_ENTRY, description);
  }
}

export function handleTypeormError(e: any) {
  switch (e.code) {
    case 'ER_DUP_ENTRY': {
      throw new DuplicateEntryException(e.message);
    }
    default: {
      throw new InternalServerErrorException(e.message);
    }
  }
}
