export function payloadGenerator(type: any, data: any, headers: any): any {
  if (type.TLS_1_0) {
    if (headers) {
      const transformedObject = {
        headers: {
          Authorization: headers.Authorization,
        },
      };
      return [data, transformedObject];
      //return [JSON.stringify(data), transformedObject]; //try this if request doesn't work as expected
    } else {
      return [data];
    }
  } else {
    return [{ headers, data }];
  }
}
