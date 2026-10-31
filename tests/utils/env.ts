/**
 * Ambil environment variable wajib. Gagal di awal dengan pesan jelas
 * daripada test gagal belakangan karena nilai kosong.
 */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable "${name}" belum di-set. Cek file .env.<ENV> atau env CI.`);
  }
  return value;
}
