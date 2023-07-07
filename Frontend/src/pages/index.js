import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewEliminatedCandidates } from 'src/sections/overview/overview-eliminated-candidates';
import { OverviewInterviewers } from 'src/sections/overview/overview-interviewers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';

const now = new Date();

const Page = () => (
  <>
    <Head>
      <title>
        Overview 
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
      <Grid
            xs={12}
            md={12}
            lg={12}
          >
            <OverviewLatestOrders
              orders={[
                {
                  id: '1',
                  ref: '1',
                  candidate : "Candidate1",
                  interviewer : "Interviewer1",
                  time : "9am - 10 am",
                  status: 'ongoing'
                },
                {
                  id: '2',
                  ref: '2',
                  candidate : "Candidate2",
                  interviewer : "Interviewer2",
                  time : "9am - 10 am",
                  status: 'ongoing'
                },
                {
                  id: '3',
                  ref: '3',
                  candidate : "Candidate3",
                  interviewer : "Interviewer3",
                  time : "9am - 10 am",
                  status: 'ongoing'
                },
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <OverviewInterviewers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="10"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="20"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <OverviewEliminatedCandidates
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="0"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <OverviewTasksProgress
              round="1"
              sx={{ height: '100%' }}
              value={300/20}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <OverviewTasksProgress
              round="2"
              sx={{ height: '100%' }}
              value={0}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <OverviewTasksProgress
              round="3"
              sx={{ height: '100%' }}
              value={0}
            />
          </Grid>
          <br />
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewTraffic
            heading="Candidates Departments"
              chartSeries={[60, 25, 15]}
              labels={['CSE', 'ECE', 'EE']}
              sx={{ height: '100%' }}
            />
          </Grid>
          
          {/* <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewLatestProducts
              products={[
                {
                  id: '5ece2c077e39da27658aa8a9',
                  image: '/assets/products/product-1.png',
                  name: 'Healthcare Erbology',
                  updatedAt: subHours(now, 6).getTime()
                },
                {
                  id: '5ece2c0d16f70bff2cf86cd8',
                  image: '/assets/products/product-2.png',
                  name: 'Makeup Lancome Rouge',
                  updatedAt: subDays(subHours(now, 8), 2).getTime()
                },
                {
                  id: 'b393ce1b09c1254c3a92c827',
                  image: '/assets/products/product-5.png',
                  name: 'Skincare Soja CO',
                  updatedAt: subDays(subHours(now, 1), 1).getTime()
                },
                {
                  id: 'a6ede15670da63f49f752c89',
                  image: '/assets/products/product-6.png',
                  name: 'Makeup Lipstick',
                  updatedAt: subDays(subHours(now, 3), 3).getTime()
                },
                {
                  id: 'bcad5524fe3a2f8f8620ceda',
                  image: '/assets/products/product-7.png',
                  name: 'Healthcare Ritual',
                  updatedAt: subDays(subHours(now, 5), 6).getTime()
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
           */}
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
