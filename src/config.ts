import moment from 'moment';
import 'moment-timezone';

moment.tz.setDefault('America/Santiago');


interface Config {
    date: String,
    time: String
}

const config: Config = {
  date: moment().format('YYYY-MM-DD'),
  time: moment().format('HH:mm:ss')
};

export default config;
  