import React from 'react'

export default function mapContextToProps<ContextType, PropsType>(
  Context: React.Context<ContextType>,
  Component: React.FC<ContextType & PropsType>,
): React.FC<PropsType> {
  return function WrappedComponent(props: PropsType) {
    const ctx = React.useContext(Context)
    const ctxAndProps = { ...ctx, ...props }
    return <Component {...ctxAndProps} />
  }
}
