# BearScribes
Repository for the project of the course Frontend Web Development (IU 2024)

## How to Build and Run Locally

### Specify your database variables in .env file.

```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASS=your_database_password
DB_NAME=your_database_name
```

### Build the Client:
```sh
npm run build --prefix client
```

### Run the Server:
```sh
pip install -r server/requirements.txt
python server/app.py
```
