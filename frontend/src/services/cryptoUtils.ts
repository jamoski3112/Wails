export const generateKey = async () => {
    const key = await crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );
    const exportedKey = await crypto.subtle.exportKey("jwk", key);
    localStorage.setItem("encryptionKey", JSON.stringify(exportedKey));
    return key;
  };
  
  export const getKey = async () => {
    const keyData = localStorage.getItem("encryptionKey");
    if (!keyData) {
      return await generateKey();
    }
    const importedKey = await crypto.subtle.importKey(
      "jwk",
      JSON.parse(keyData),
      {
        name: "AES-GCM",
      },
      true,
      ["encrypt", "decrypt"]
    );
    return importedKey;
  };
  
  export const encryptData = async (data: string) => {
    const key = await getKey();
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      encodedData
    );
    return {
      iv: Array.from(iv),
      data: Array.from(new Uint8Array(encryptedData)),
    };
  };
  
  export const decryptData = async (encryptedData: { iv: number[]; data: number[] }) => {
    const key = await getKey();
    const iv = new Uint8Array(encryptedData.iv);
    const data = new Uint8Array(encryptedData.data);
    const decryptedData = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      data
    );
    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
  };