ARG target=filipesilva/node-bazel-windows:0.0.2
FROM $target

# Copy files
WORKDIR /src
COPY ./ /src

# Setup
COPY .circleci/bazel.rc /etc/bazel.bazelrc
RUN del packages\upgrade\static\src
RUN mklink /d packages\upgrade\static\src ..\src
RUN yarn install --frozen-lockfile --non-interactive --network-timeout 100000

# Run tests
RUN yarn bazel test //tools/ts-api-guardian:all --noshow_progress
