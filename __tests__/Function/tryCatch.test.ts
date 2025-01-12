import { expectType } from 'ts-expect'

import { R, Result, F, pipe, O } from '../..'

type User = {
  readonly name: string
}

const throwError = (_x: number): number => {
  throw new Error('fix me!')
}

describe('tryCatch', () => {
  it('provides correct types', () => {
    expectType<Result<unknown, string>>(F.tryCatch('<>', JSON.parse))
    expectType<Result<User, string>>(
      F.tryCatch<string, User>('{"name": "Joe"}', JSON.parse),
    )
    expectType<Result<number, string>>(F.tryCatch(1, throwError))
    F.tryCatch('hello', str => {
      expectType<string>(str)
    })
  })

  it('returns correct value', () => {
    expect(F.tryCatch(123, throwError)).toEqual(R.Error('fix me!'))
  })

  it('*', () => {
    const { Ok, Error } = R

    expect(
      /*
      type User = {
        readonly prop: string
      }
      */
      F.tryCatch('{"name": "Joe"}', JSON.parse),
    ).toEqual(
      // prettier-ignore
      Ok({ name: 'Joe' }),
    )
    expect(F.tryCatch('<>', JSON.parse)).toEqual(
      Error('Unexpected token < in JSON at position 0'),
    )
  })
})

describe('tryCatch (pipe)', () => {
  it('provides correct types', () => {
    expectType<Result<unknown, string>>(pipe('<>', F.tryCatch(JSON.parse)))
    expectType<Result<User, string>>(
      pipe('{"name": "Joe"}', F.tryCatch<string, User>(JSON.parse)),
    )
    expectType<Result<number, string>>(F.tryCatch(1, throwError))
    pipe(
      'hello',
      F.tryCatch(str => {
        expectType<string>(str)
      }),
    )
  })

  it('returns correct value', () => {
    expect(pipe(123, F.tryCatch(throwError))).toEqual(R.Error('fix me!'))
  })

  it('*', () => {
    expect(
      pipe(
        '{"name": "Joe"}',
        F.tryCatch<string, User>(JSON.parse),
        R.map(user => user.name),
        R.getWithDefault('oops'),
      ),
    ).toEqual('Joe')
    expect(
      pipe('<>', F.tryCatch(JSON.parse), R.toOption, O.getWithDefault('oops')),
    ).toEqual('oops')
  })
})
