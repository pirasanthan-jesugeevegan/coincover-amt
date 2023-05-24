export function payloadGenerator(type: any, headers: any, data: any): any {
  if (type.TLS_1_0) {
    const transformedObject = {
      headers: {
        Authorization: headers.Authorization,
      },
    };

    return [JSON.stringify(data), transformedObject];
  } else {
    return [{ headers, data }];
  }
}
