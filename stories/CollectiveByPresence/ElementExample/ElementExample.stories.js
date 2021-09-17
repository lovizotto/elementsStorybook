import { storiesOf } from '@storybook/html';
import { withRunScript } from 'storybook-addon-run-script/html';
import ElementExample from './ElementExample.handlebars';
import './ElementExample.scss'
import runScript from './ElementExample.runscript';
import data from './ElementExample.js'

storiesOf('Element using handlebars', module)
    .addDecorator(withRunScript(runScript))
    .add('Contact Form', () => {
        return ElementExample(data)
    });
