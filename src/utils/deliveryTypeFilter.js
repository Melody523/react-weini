export function deliveryTypeFilter(value) {
  switch (String(value)) {
    case '1':
      return '保税区邮'
    case '2':
      return '香港直邮'
    case '4':
      return '海外直邮'
    case '5':
      return '国内发货'
    default:
      break;
  }
}