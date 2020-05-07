import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  //After firebase is loaded and the call is modified for the dropdown and data type, this class can be
  //renamed and copy/pasted to the bottom of this document then that renamed for next data type
  //This can be repeated for all scatters
class Scatter extends Component {
    render() {
        var data = [
            {x: '5-12-2020', y: 512},
            {x: '5-06-2020', y: 8},
            {x: '5-07-2020', y: 16},
            {x: '5-08-2020', y: 32},
            {x: '5-09-2020', y: 64},
            {x: '5-10-2020', y: 128},
            {x: '5-11-2020', y: 256},
            {x: '5-13-2020', y: 1024},
            {x: '5-14-2020', y: 2048},
            {x: '5-15-2020', y: 4096},
            {x: '5-16-2020', y: 8192},
            {x: '5-03-2020', y: 1},
            {x: '5-04-2020', y: 2},
            {x: '5-05-2020', y: 4},
        ];

        //Change the 'USA' to this.props.sel and console.log to storing in data[]
        this.props.db.collection('USA').get().then((query) => {
          query.docs.forEach(doc => {
            console.log(doc.id);
          });
        })

        console.log(data);
        data.sort(compareValues('x'));

        return (
            <div>
                <p>{this.props.sel}</p>
                <LineChart width={600} height={300} data={data}>
                    <Line type="monotone" dataKey="y" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="x" />
                    <YAxis />
                </LineChart>
            </div>
        );
    }
}

export default Scatter;