import { HttpError } from 'http-errors';
import { NextResponse } from 'next/server';

function mountError(error: HttpError) {
    if (error.errors) {
      return error.errors.map((err: HttpError) => err.msg);
    }
  
    if (error.message) {
      return [error.message];
    }
  
    return ["Algum erro aconteceu."];
  }

export function handleError(error: HttpError) {
    const errors = mountError(error);
    return NextResponse.json(errors, { status: error.status ?? 500 });
};