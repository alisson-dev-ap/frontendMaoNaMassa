import React, { FC, PropsWithChildren } from 'react';
import { VisibilityProps } from './interface';

export const Visibility: FC<VisibilityProps> = (props) => {
  const { visible, children } = props;

  return visible ? <>{children}</> : <></>;
};