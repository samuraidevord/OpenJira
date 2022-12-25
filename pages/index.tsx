// NextJS
import type { NextPage } from "next";
// Material UI
import { Grid, Typography, Card, CardHeader, CardContent } from "@mui/material";
import { Layout } from "../components/layouts";
import { EntryList, NewEntry } from "../components/ui";
const HomePage: NextPage = () => {
  return (
    <Layout title="Home | Open Jira">
      <Grid maxWidth="xl" margin="auto">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: "calc(100vh - 100px)" }}>
              <CardHeader title="Pendientes" />

              <NewEntry />
              <CardContent>
                <EntryList status="pending" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: "calc(100vh - 100px)" }}>
              <CardHeader title="En Progreso" />
              <CardContent>
                <EntryList status="in-progress" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: "calc(100vh - 100px)" }}>
              <CardHeader title="Completadas" />
              <CardContent>
                <EntryList status="finished" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
