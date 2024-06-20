import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Unstable_Grid2';
import { Weather, WeatherIcons } from '../types';
import { Typography, styled } from '@mui/material';
import { observer } from 'mobx-react';

const StyledCircle = styled('div')(({ theme }) => ({
  borderRadius: '50%',
  width: theme.spacing(16),
  height: theme.spacing(16),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 72,
  backgroundColor: 'blue'
}));

const CurrentWeatherCard = ({ weather: { payload, type } }: { weather: Weather }) => {
  return (
    <Card elevation={3}>
      <CardHeader title={`Currently: ${type ? type : '-'}`} />
      <CardContent>
        <Grid
          container
          rowSpacing={{ xs: 1, sm: 2 }}
          columnSpacing={{ xs: 1, sm: 2 }}
          justifyContent="center">
          {type ? (
            <Grid
              xs={12}
              sx={{ display: 'flex', justifyContent: 'center', fontSize: 72 }}>
              <StyledCircle>{WeatherIcons[type]}</StyledCircle>
            </Grid>
          ) : null}

          {payload ? (
            <Grid xs={12}>
              {Object.entries(payload).map(
                ([name, value], index) =>
                  name !== 'precipitationType' && (
                    <p key={index}>
                      <Typography
                        variant="body1"
                        component="span">
                        {name}:{' '}
                      </Typography>
                      <Typography
                        variant="body1"
                        component="span">
                        {typeof value === 'string' && !value.length ? '-' : value}
                      </Typography>
                    </p>
                  )
              )}
            </Grid>
          ) : null}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default observer(CurrentWeatherCard);
