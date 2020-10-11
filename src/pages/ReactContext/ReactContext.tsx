import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightBlue } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import {
  BackToPostsLink,
  PostTitle,
  Breadcrumbs,
  ParagraphHeader,
  Code,
} from '../../components'
import * as snippets from './snippets'

const style = tomorrowNightBlue

const crumbs = [
  {
    label: 'posts',
    link: '/',
  },
  {
    label: 'react context',
  },
]

export default function ReactContext() {
  return (
    <>
      <Breadcrumbs crumbs={crumbs} />
      <PostTitle>about React context</PostTitle>
      <ParagraphHeader>Overview</ParagraphHeader>
      <p>
        Before we talk about React context and how it can be used, we should
        talk about the motivation behind it. If you have used React, then you
        may have run into the issue of <b>prop drilling</b>. React has a top
        down, or unidirectional, data flow. Data flows from the top level
        container down to components further down the tree. Prop drilling is the
        process of getting a piece of data down to the component that needs it.
        Depending on how deep your tree is, you may often have to pass data
        through many layers to get it to the right place. Often times, you may
        pass a prop to a component that does not use that prop in any way except
        for forwarding it to the next component. You can sometimes avoid this by
        restructuring your component hierarchy, but sometimes it is unavoidable.
        Prop drilling clutters your components and makes it harder to see which
        props a component actually relies on to do its job.
      </p>
      <ParagraphHeader>Providing context</ParagraphHeader>
      <p>
        Here is a concrete example: imagine your app has an authenticated user
        that has a <Code>name</Code> property and a <Code>nickname</Code>{' '}
        property. Now, say we had to use this user data in many components of
        our app, and we did not want to manually pass this information around
        through props. This is where <b>React context</b> comes into play. What
        we can do is create a React context at the root level of our app and set
        its value to some user data. Then, we use what is called a{' '}
        <b>Provider</b> in order to allow this context to be consumed by any
        component nested inside of the Provider. Let's look at a real code
        example.
      </p>
      <SyntaxHighlighter language="javascript" style={style}>
        {snippets.USER_CONTEXT}
      </SyntaxHighlighter>
      <SyntaxHighlighter language="javascript" style={style}>
        {snippets.CONTEXT_PROVIDER}
      </SyntaxHighlighter>
      <p>
        Let's walk through the snippets above to see what's going on. In{' '}
        <Code>UserContext.ts</Code>, we simply create the context and then
        export it so that it can be referenced. In <Code>App.tsx</Code>, we make
        use of the Provider component on the context to wrap all the components
        nested inside of it. When a nested component attempts to consume a React
        context, React will traverse the tree upwards until it finds a Provider
        of that context. If a Provider is found, then the current value of it is
        returned. If no Provider is found, the default value of the context is
        returned.
      </p>
      <ParagraphHeader>Consuming context</ParagraphHeader>
      <p>
        Now let's look at an example of how a component can consume this
        context.
      </p>
      <SyntaxHighlighter language="javascript" style={style}>
        {snippets.CONTEXT_CONSUMER}
      </SyntaxHighlighter>
      <p>
        This is a very simple example. React provides a utility hook{' '}
        <Code>useEffect</Code> that makes it very easy to consume a React
        context. The value returned by the <Code>useContext</Code> call will
        either be some user data, or <Code>null</Code>. In this{' '}
        <Code>NameTag</Code> component, we simply display the name of the user
        and the nickname if the flag from props is <Code>true</Code>.
      </p>
      <ParagraphHeader>Some issues with React context</ParagraphHeader>
      <p>
        At this point, React context may seem pretty handy, but it is not
        without its issues. Consider the <Code>NameTag</Code> example above.
        When the value of <Code>user</Code> comes from context, it becomes
        difficult to see that the component relies on some user data in order to
        do its job. In other words, think of the props of a component as the
        component's API, indicating how the component is used and what its
        behavior is like. When the values that the component depends on are
        obscured inside the body of the function, we lose the ability to look at
        the component's props in order to grok the component.
      </p>
      <p>
        Another issue is with testing the component. Because the value comes
        from context rather than props, we need to change up our tests to either
        wrap the component with a mock Provider or mock the return value of the{' '}
        <Code>useContext</Code> call. This isn't the worst thing, but it's
        tedious, and I prefer being able to pass plain old props when writing
        tests.
      </p>
      <ParagraphHeader>Proposal: mapContextToProps</ParagraphHeader>
      <p>
        How can we take advantage of React context and avoid some of the issues
        that come with it? I propose a utility{' '}
        <Code>
          <b>mapContextToProps</b>
        </Code>{' '}
        as a possible solution. &nbsp;<Code>mapContextToProps</Code> behaves
        almost exactly like Redux's <Code>mapStateToProps</Code> and{' '}
        <Code>mapDispatchToProps</Code>. In fact, Redux actually uses React
        context under the hood to make the Redux store available to deeply
        nested components! However, to use Redux is to use all of Redux. You
        would have to incorporate the store, reducers, actions, and dispatch
        into your app, which is very invasive. That is a matter of taste and is
        a separate discussion entirely. &nbsp;<Code>mapContextToProps</Code>{' '}
        simply extracts that useful feature of Redux into an independently
        usable utility. The goal is to keep the ability to define the component
        using plain old props, while also being able to take advantage of React
        context to avoid excessive prop drilling. If we can do this, then we can
        get the best of both worlds. Let's see an example.
      </p>
      <SyntaxHighlighter language="javascript" style={style}>
        {snippets.NAME_TAG_V2}
      </SyntaxHighlighter>
      <p>
        The above snippet is a modified version of the <Code>NameTag</Code>{' '}
        component that we defined earlier. There's a bit to unpack here. First,
        we defined an interface <Code>Context</Code> to represent properties
        that we expect to receive from context. Then, we defined an interface{' '}
        <Code>Props</Code>&nbsp; to represent properties that we expect to
        receive as direct props. Then, in the component signature, we combine
        these two interfaces (<Code>Context & Props</Code>) to get the
        comprehensive set of all expected properties. Notice that there is no
        longer a call to <Code>useContext</Code> in the body of our component.
        Instead, we moved the user data out into the <Code>Context</Code>{' '}
        interface and we now expect to be receive the user value inside of{' '}
        <Code>props</Code>. So, how is React context actually being used in this
        example? The answer is in a utility function{' '}
        <Code>mapContextToProps</Code>. As the name suggests, the purpose of{' '}
        <Code>mapContextToProps</Code> is to take any values that we expect to
        live inside of React context and map them directly to the props of the
        component.
      </p>
      <p>
        Let's see how this directly addresses some of our issues that we had
        with context. The default export is the context-mapped version of the
        component while the named export is the bare component. Now, when
        testing this component, we can import the bare component and assert its
        behavior just like we normally would, without having to worry about
        context at all. And when utilizing the component within our app, we
        import the context-mapped version of the component that consumes some
        context. By using the context-mapped version of the component, we no
        longer have to worry about prop drilling important pieces of data
        through many layers in order for the component to work. When we glance
        at the component, we can see all of the required properties near the top
        of the file by checking out our two interfaces: <Code>Context</Code> and{' '}
        <Code>Props</Code>. Before, we could have missed the fact that our user
        data was being utilized within the component, which may have led to
        confusion or misuse of the component. By looking at the{' '}
        <Code>Context</Code> interface, we can easily understand that the
        component requires some context Provider higher up in the component tree
        that provides those values. Now, let's look at the code for{' '}
        <Code>mapContextToProps</Code>.
      </p>
      <SyntaxHighlighter language="javascript" style={style}>
        {snippets.MAP_CONTEXT_TO_PROPS}
      </SyntaxHighlighter>
      <p>
        There isn't actually a lot happening here. Most of it is just utilizing
        TypeScript to ensure type safety. &nbsp;<Code>mapContextToProps</Code>{' '}
        simply returns a curried functional component that combines context and
        props to produce the full list of properties that the component expects.
        In the returned component's body, we simply get the value of the
        context, combine it with the received props, and then forward the result
        to the component we are wrapping. This is a simple utility, but it
        enables us to use context effectively.
      </p>
      <ParagraphHeader>Conclusion</ParagraphHeader>
      <p>
        When I first learned about React context, I was very eager to use it.
        After utilizing it in the standard way, I ran into some issues that
        caused me to abandon it and go back to prop drilling. However, I think{' '}
        <Code>mapContextToProps</Code> is worth evaluating as it addresses the
        main issues of React context. It is also minimally invasive to try. To
        try it, one would simply split the component's props into context props
        and direct props, and then change the default export to be the
        context-mapped version of the component using{' '}
        <Code>mapContextToProps</Code>. I have not extensively tested this
        solution, but I will try this pattern in future projects and I hope it
        works well.
      </p>
      <BackToPostsLink />
    </>
  )
}
