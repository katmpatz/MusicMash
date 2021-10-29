import { pink } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

export const THEME = createMuiTheme({
    typography: {
     "fontFamily": `"Poppins", sans-serif`,
     color: 'rgba(255, 255, 255, 0.87)',
     h1:{
        '@media (max-width:1007px)': {
            fontSize: '44px',
        },
        '@media (max-width:640px)': {
            fontSize: '32px',
        }
     },    
     h2:{
        '@media (max-width:1007px)': {
            fontSize: '32px',
        },
        '@media (max-width:640px)': {
            fontSize: '26px',
        }
     },
     h3:{
        '@media (max-width:1007px)': {
            fontSize: '24px',
        },
        '@media (max-width:640px)': {
            fontSize: '22px',
        }
     },
     h4:{
        '@media (max-width:1007px)': {
            fontSize: '18px',
        },
        '@media (max-width:640px)': {
            fontSize: '18px',
        }
    },
    h5:{
        '@media (max-width:1007px)': {
            fontSize: '16px',
        },
        '@media (max-width:640px)': {
            fontSize: '16px',
        }
    },
    h6:{
        '@media (max-width:1007px)': {
            fontSize: '1rem',
        },
        '@media (max-width:640px)': {
            fontSize: '13px',
        }
    }

    },
    palette: {
        primary:{
            main: '#BB86FC'
        },
        error: pink,
        info:{
            main: '#64ffda'
        },
        text: {
            primary: '#ffffff'
        },
        background: {
            main:'#121212'
        },
        action: {
            disabled: 'gray',
        }
    },
});