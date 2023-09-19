import { FC } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';

interface Props {
    children?: React.ReactNode;
    title: string
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{ title }</title>
            </Head>

            <main>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: 'calc(100vh - 200px)',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {children}
                </Box>
            </main>
        </>
    );
}