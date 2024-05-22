import Service from '@ember/service';

export default class DatatableService extends Service {
  data = [
    [
      'Book No',
      'Book Name',
      'Author Name',
      'Type',
      'Date',
      'Time',
      'Name',
      'ID',
    ],
    ['1', 'Book1', 'Author1', 'Adventure', '2024-02-03', '10:10', 'aaaa', '1'],
    ['2', 'Book2', 'Author2', 'Fantasy', '2024-02-04', '10:15', 'bbbb', '2'],
    ['3', 'Book3', 'Author3', 'Fiction', '2024-02-05', '14:30', 'cccc', '3'],
  ];
}
