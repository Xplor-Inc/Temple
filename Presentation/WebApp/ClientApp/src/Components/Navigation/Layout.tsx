import * as React from 'react';
import { Container } from 'reactstrap';
import { Footer } from './Footer';
import NavMenu from './NavMenu';

export default class Layout extends React.PureComponent<{}, { children?: React.ReactNode }> {
    public render() {
        return (
            <>
                <NavMenu />
                <Container className='container-body'>
                    {this.props.children}
                </Container>
                <Footer />
            </>
        );
    }
}