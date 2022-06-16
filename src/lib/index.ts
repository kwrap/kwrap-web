export * as crypto from './crypto'
export { KwrapFile } from './kwrap'
export * from './generate'
export * from './http'
export * from './icons'
export * from './local-data'
export * from './password'
export * from './theme'
export * as utils from './utils'

import clsx from 'clsx'
export const classNames = clsx

import React, { useState, useEffect, useRef } from 'react'
import { createRoot, Root } from 'react-dom/client'
export {
    RecoilRoot,
    atom,
    useRecoilState,
    useRecoilValue,
    selector,
    useSetRecoilState
} from 'recoil'

export type ReactDomRoot = Root
export { React, useState, useEffect, useRef, createRoot }
