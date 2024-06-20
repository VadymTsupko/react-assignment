import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Unstable_Grid2';
import { observer } from 'mobx-react';
import { Children, PropsWithChildren } from 'react';

const RecommendedClothCard: React.FC<PropsWithChildren> = ({ children }) => {
  const result = Children.toArray(children);

  return (
    <Card elevation={3}>
      <CardHeader title="Recommended clothes:" />
      <CardContent>
        <Grid
          container
          rowSpacing={{ xs: 1, sm: 2 }}
          columnSpacing={{ xs: 1, sm: 2 }}
          justifyContent="center">
          {result.map((val, index) => (
            <Grid
              xs={6}
              key={index}
              sx={{ display: 'flex', justifyContent: 'center', fontSize: 72 }}>
              {val}
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default observer(RecommendedClothCard);
