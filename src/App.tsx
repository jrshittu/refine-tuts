import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { 
  notificationProvider, 
  ThemedLayoutV2,
  ErrorComponent,
  RefineThemes,
  RefineSnackbarProvider 
} from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material";
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { MuiInferencer } from '@refinedev/inferencer/mui'

function App() {
  return (
    <ThemeProvider theme={RefineThemes.Blue}>
      <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                notificationProvider={notificationProvider}
                routerProvider={routerBindings}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                resources={[
                  {
                      name: "blog_posts",
                      list: "/blog-posts",
                      show: "/blog-posts/show/:id",
                      create: "/blog-posts/create",
                      edit: "/blog-posts/edit/:id",
                  },
              ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "h6BSVU-EemPgZ-9LMG2g",
                }}
              >
                <Routes>
                    <Route 
                      element={
                        <ThemedLayoutV2>
                            <Outlet />
                        </ThemedLayoutV2>}
                    >
                      <Route index element={<WelcomePage />} />
                      <Route path="blog-posts">
                                    <Route index element={<MuiInferencer />} />
                                    <Route
                                        path="show/:id"
                                        element={<MuiInferencer />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<MuiInferencer />}
                                    />
                                    <Route
                                        path="create"
                                        element={<MuiInferencer />}
                                    />
                    </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>     
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>

    </ThemeProvider>
      );
}

export default App;
