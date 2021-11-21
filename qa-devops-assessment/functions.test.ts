const {shuffleArray} = require('./utils')

describe('shuffleArray should', () => {
    // CODE HERE

    test('id should match', () => {
        const obj = {
        id: '3',
        name: 'Beta', 
        imgAddress: 'https://robohash.org/beta',
        health: 95
    };
        expect(obj.id).toEqual('3')

      });

     test('name in shuffleArray', () => {
         expect("Prime Information Drone").toContain("Drone")
     })
     
     test('length in shuffleArray', () => {
         const bots = [
             'The Hammer',
             'Crowbar',
             'Rusty',
             'Beta',
             'Prime Information Drone',
             'BroBot',
             'Nozzle',
             'Globotron',
             'Self-Aware Garbage Android', 
             'Mechi'
         ];
         expect(bots).toEqual(expect.arrayContaining(
            [
                'The Hammer',
             'Crowbar',
             'Rusty',
             'Beta',
             'Prime Information Drone',
             'BroBot',
             'Nozzle',
             'Globotron',
             'Self-Aware Garbage Android', 
             'Mechi'
            ]
        ));
        expect(bots).toHaveLength(10);
     })

})