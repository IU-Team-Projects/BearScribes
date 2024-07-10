import secrets

# Генерация секретного ключа длиной 32 байта
secret_key = secrets.token_hex(32)
print(secret_key)
