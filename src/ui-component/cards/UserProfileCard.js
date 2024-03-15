import PropTypes from 'prop-types';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Button, Card, CardContent, CardMedia, Chip, Grid, Typography } from '@mui/material';

// project imports
import Avatar from '../extended/Avatar';
import { gridSpacing } from 'store/constant';

const UserProfileCard = ({ name, profile, phone, email }) => {
    const theme = useTheme();
    const avatarProfile = profile && profile;

    return (
        <Card
            sx={{
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                border: theme.palette.mode === 'dark' ? 'none' : '1px solid',
                borderColor: theme.palette.grey[100],
                textAlign: 'center'
            }}
        >
            <CardContent sx={{ p: 10 }}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Avatar alt={name} src={avatarProfile} sx={{ width: 72, height: 72, m: '-50px auto 0' }} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} alignItems="center">
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="h4">{name && name}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2">{phone && phone}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2">{email && email}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

UserProfileCard.propTypes = {
    avatar: PropTypes.string,
    name: PropTypes.string,
    profile: PropTypes.string,
    role: PropTypes.string,
    status: PropTypes.string
};

export default UserProfileCard;
