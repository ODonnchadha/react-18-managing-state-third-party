## Quick Start

- Install the latest Node LTS from [nodejs.org](https://nodejs.org/).
    - Then, run the following commands in your terminal:
        ```bash
        npm install
        npm start
        ```
    - This will start the app and the mock API server on [http://localhost:3000](http://localhost:3000).

## React Third-party State Management Playbook by Cory House

- OVERVIEW:
    - When third-party state is useful. Braod categories of state management.
    - Key tradeoffs between different state approaches.
    - How to convert an existing React application to use different state libraries.

- PICKING A THIRD-PARTY STATE MANAGEMENT LIBRARY:
    - Why use third-party state:
        - State hook limitations. 
            - Cannot "protect" state. useContext only for infrequent data changes.
            - Can only be "read" in React components.
    - Third-party state categories:
        - Performance: Render optimization. Caching.
        - Flexibility: Access state outside of React. Global be default. "Protect" state.
        - DX: Developer experience. Less code and rich development tools.
    - When to consider global state:
        - Application entry point. And then pass state to child components via properties.
        1. Lift state: User data lifted to a common ancestor and then passed down to children.
            - e.g.: Six different components may have to pass data down for two that need it.
                - Prop drilling. Small and midsize applications are fine with this.
        2. React context. Exposing global data and function. UserContext Consumer, for example.
            - Calling shared functions, e.g.:
        3. Third-party state management tool. State accessed via the store. 
            - Any component can access and modify state.
    - Picking a library:
        - Unidirectional: Redux. Zustand.
            - Storing state outside of React. You design as to how state is changed.
                - Redux: One store.
        - Atomic: Recoil. Jotai.
            - Small state in different stores called atoms. Unprotected. Granular state updates.
        - Proxy: Mobx. Valtio.
            - Store small pieces of state, wrapped in a proxy object. Mutable state.
                - Optimizes performance.
        - Remote: RTK Query. Apollo.
            - Storing data fetched from a server. Handle loading and error state.
            - Cache and dedupe requests. Automatically refresh when needed.
        - NOTE: Over 30 ways to handle state.
            - e.g.: Built in. Web platform. General state. Remote state. Route state. Form state.
    - Third-party state. Key differences:
        - General versus specific:
        - Mutable versus Immutable.
        - External versus internal. Accessability outside of React?
        - Automatic versus manual render optimization.
            - Mutated proxy? Automatically re-render.
        - One store versus multiple stores. Seperation.
        - Concept: Top-dwon versus bottom-up. 
            - Key domain objects with details over time.
            - Or smaller pieces of state that then compose.
        - Protected versus unprotected state. How can, and should, people interact?
            - e.g.: Call a logout function, which is safer and more scalable.
    - Picking an approach:
        - Eight ways to handle state in React:
            1. URL: Shareable via the URL? Great for sharing and bookmarks.
            2. Web storage:
            3. Local state
            4. Lifted state
            5. Derived state
            6. Refs
            7. Context
            8. Third-party library.
    - Reviewing the demonstration application.
        - The application stores user and cart data via useState. And it shares it via React's context.
        - Refactor to use a variety of third-party state libraries.
        - Entry point: src/main.tsx.

- IMPLEMENTING UNIDIRECTIONAL STATE WITH REDUX OR ZUSTAND:
    - Unidirectional state: State updates flow in one direction. The state cannot be directly changed. It is protected.
        - Redux: 
            - One immutable store. Wrapper the application in provider.
            - A toolkit is recommended. Can add on RTK Query. Dispatch actions.
            - Optimize renders via selectors. Globally available store.
        - Zustand:
            - One or multiple stores. No provider required. Streamlined API.
            - No RTK Query equivalent. Use callbacks or actions.
            - Optimize renders via selectors. Can expose to subtree via context.
        - Scalable, since it provides safety.
        - It does not track which fields you are using. You manually subscribe via selectors.
            - This offers scalability and clarity. But there is more code to write.
    - This is a selector. It's an optional performance optimization:
        ```javascript
            const user = useShoeStore((state) => state.user);
        ```