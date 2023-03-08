FROM node:18 as base

WORKDIR /app

RUN npm install -g npm-cli-login
RUN npm-cli-login -u "bailey-1" -p "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" -e "44928829+Bailey-1@users.noreply.github.com" -r "https://npm.pkg.github.com" -s "@bailey-1"
COPY package.json .
COPY package-lock.json .

FROM base as prod
RUN npm ci --production
COPY . .

CMD ["npm", "build"]
